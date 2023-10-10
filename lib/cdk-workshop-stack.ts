import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

export class CdkWorkshopStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });
  }
}
