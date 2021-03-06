/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExpenseCategoryFilters } from "./../../../globalTypes/api";

// ====================================================
// GraphQL query operation: listExpenseCategories
// ====================================================

export interface listExpenseCategories_expenseCategories_nodes_expenseCategoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface listExpenseCategories_expenseCategories_nodes {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  description: string | null;
  expenseCategoryGroup: listExpenseCategories_expenseCategories_nodes_expenseCategoryGroup;
}

export interface listExpenseCategories_expenseCategories {
  __typename: "PaginatedExpenseCategory";
  nodes: listExpenseCategories_expenseCategories_nodes[];
}

export interface listExpenseCategories {
  expenseCategories: listExpenseCategories_expenseCategories;
}

export interface listExpenseCategoriesVariables {
  filters?: ExpenseCategoryFilters | null;
}
