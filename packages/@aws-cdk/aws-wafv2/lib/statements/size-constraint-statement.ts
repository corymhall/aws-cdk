// import { Construct } from '@aws-cdk/core';
// import { WebAcl } from '../web-acl';
// import { BaseMatchStatementProps, Statement, StatementConfig } from './statement';
// import { returnFieldToMatchValue } from './utils';
//
// /**
//  * Update
//  */
// export enum ComparisonOperator {
//   /**
//    * Update
//    */
//   EQ,
//
//   /**
//    * Update
//    */
//   GE,
//
//   /**
//    * Update
//    */
//   GT,
//
//   /**
//    * Update
//    */
//   LE,
//
//   /**
//    * Update
//    */
//   LT,
//
//   /**
//    * Update
//    */
//   NE
// }
//
// /**
//  * Update
//  */
// export interface SizeConstraintStatementProps extends BaseMatchStatementProps {
//   /**
//    * @default
//    */
//   comparisonOperator?: ComparisonOperator;
//
//   /**
//    * @default
//    */
//   size?: number;
// }
//
// /**
//  * Update
//  */
// export class SizeConstraintStatement extends Statement {
//   constructor(private readonly props: SizeConstraintStatementProps) {
//     super();
//   }
//
//   public bind(_scope: Construct, _webAcl: WebAcl): StatementConfig {
//     return {
//       name: 'SizeConstraintStatement',
//       value: {
//         ComparisonOperator: this.props.comparisonOperator,
//         Size: this.props.size,
//         TextTransformations: this.props.textTransformations,
//         ...returnFieldToMatchValue(this.props.fieldToMatch, this.props.fieldToMatchValue)
//       }
//     };
//   }
// }
