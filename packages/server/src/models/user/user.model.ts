import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType } from 'type-graphql'

import { ApolloForbidden, ApolloResourceNotFound } from '../../utils/errors'
import { checkPassword, hashPassword } from '../../utils/hashPassword'
import { BaseModel } from '../base/BaseModel'

import { InsertUserPayload, LoginPayload } from './user.types'

@ObjectType('User')
export class UserModel extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {}
  }

  static getReference(id: string | number, trx?: Transaction) {
    return UserModel.query(trx).where('id', id).first()
  }

  static async checkCredentials(payload: LoginPayload, trx?: Transaction) {
    const user = await UserModel.query(trx)
      .where('email', payload.email)
      .first()

    if (!user) {
      throw new ApolloResourceNotFound({
        message: 'Wrong email',
      })
    }

    const isPasswordCorrect = await checkPassword(
      payload.password,
      user.password
    )

    if (!isPasswordCorrect) {
      throw new ApolloForbidden({
        message: 'Wrong password',
      })
    }

    return user
  }

  static async insertReference(
    payload: InsertUserPayload,
    isAdmin: boolean,
    trx?: Transaction
  ) {
    const cleanPayload = pick(payload, UserModel.INSERT_FIELDS)

    cleanPayload.password = await hashPassword(cleanPayload.password)

    return this.query(trx).insertAndFetch({ ...cleanPayload, isAdmin })
  }

  static readonly INSERT_FIELDS: (keyof UserModel)[] = ['email', 'password']

  static readonly UPDATE_FIELDS: (keyof UserModel)[] = []

  @Field((type) => String)
  email: string

  password: string

  @Field((type) => Boolean)
  isAdmin: boolean
}
