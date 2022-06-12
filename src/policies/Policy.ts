import { LoginContext } from "../context/login_context";

export interface ILoginPolicyResult 
{
    status: number;
    message: string;
}

export abstract class Policy 
{
    public abstract apply(context: LoginContext): ILoginPolicyResult;
}
