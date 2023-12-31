import { Code, Function, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface HitCounterProps {
  downstream: IFunction;
}

export class HitCounter extends Construct {
  public readonly handler: Function;

  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id);

    const table = new Table(this, 'Hits', {
        partitionKey: { name: 'path', type: AttributeType.STRING }
    });

    this.handler = new Function(this, 'HitCounterHandler', {
        runtime: Runtime.NODEJS_18_X,
        handler: 'hitcounter.handler',
        code: Code.fromAsset('lambda'),
        environment: {
            DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
            HITS_TABLE_NAME: table.tableName
        }
    });
  }
}
