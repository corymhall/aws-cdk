import { Construct } from '@aws-cdk/core';
import { WebAcl } from '../web-acl';

/**
 * Update
 */
export enum FieldToMatch {
  /**
   * Update
   */
  ALL_QUERY_ARGUMENTS = 'allQueryArguments',

  /**
   * Update
   */
  BODY = 'body',

  /**
   * Update
   */
  METHOD = 'method',

  /**
   * Update
   */
  QUERY_STRING = 'queryString',

  /**
   * Update
   */
  SINGLE_HEADER = 'singleHeader',

  /**
   * Update
   */
  SINGLE_QUERY_ARGUMENT = 'singleQueryArgument',

  /**
   * Update
   */
  URI_PATH = 'uriPath'
}

/**
 * Update
 */
export enum TextTransformationType {

  /**
   * Update
   */
  CMD_LINE = 'CMD_LINE',

  /**
   * Update
   */
  COMPRESS_WHITE_SPACE = 'COMPRESS_WHITE_SPACE',

  /**
   * Update
   */
  HTML_ENTITY_DECODE = 'HTML_ENTITY_DECODE',

  /**
   * Update
   */
  LOWERCASE = 'LOWERCASE',

  /**
   * Update
   */
  URL_DECODE = 'URL_DECODE',

  /**
   * Update
   */
  NONE = 'NONE'
}

/**
 * Update
 */
export interface TextTransformation {
  /**
   * Update
   * @default
   */
  readonly priority?: number;

  /**
   * Update
   */
  readonly type: TextTransformationType;
}

/**
 * Update
 */
export interface BaseMatchStatementProps {

  /**
   * Update
   * @default
   */
  readonly fieldToMatch?: FieldToMatch;

  /**
   * Update
   * @default
   */
  readonly textTransformations?: TextTransformation;

  /**
   * Update
   * @default
   */
  readonly fieldToMatchValue?: string;
}

/**
 * Update
 */
export interface StatementConfig {

  /**
   * Update
   */
  readonly config: any;
}

/**
 * Update
 */
export abstract class Statement {
  /**
   * Update
   */
//   public static xssMatchStatement(props: XssMatchStatementProps = {}): Statement {
//     return new XssMatchStatement(props);
//   }

  public abstract bind(scope: Construct, webAcl: WebAcl): StatementConfig;
}
