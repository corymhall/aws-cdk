// import { Construct } from '@aws-cdk/core';
// import { WebAcl } from '../web-acl';
// import { BaseMatchStatementProps, Statement, StatementConfig } from './statement';
// import { returnFieldToMatchValue } from './utils';
//
// /**
//  * Update
//  */
// export interface SqliMatchStatementProps extends BaseMatchStatementProps {}
//
// /**
//  * Update
//  */
// export class SqliMatchStatement extends Statement {
//   constructor(private readonly props: SqliMatchStatementProps) {
//     super();
//   }
//
//   public bind(_scope: Construct, _webAcl: WebAcl): StatementConfig {
//     return {
//       name: 'SqliMatchStatement',
//       value: {
//         TextTransformations: this.props.textTransformations,
//         ...returnFieldToMatchValue(this.props.fieldToMatch, this.props.fieldToMatchValue)
//       }
//     };
//   }
// }
