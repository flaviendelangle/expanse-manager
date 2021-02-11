import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'

@Resolver(ExpenseModel)
export class ExpenseMutationResolver {
  @Mutation((returns) => ExpenseModel)
  async upsertExpense(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpensePayload)
    payload: UpsertExpensePayload
  ) {
    return ExpenseModel.upsertReference(payload, ctx.trx)
  }
}
