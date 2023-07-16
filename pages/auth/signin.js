
import { getProviders, signIn} from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

function SignIn({ providers }) {
    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <h1 className="display-5 fw-bold">Sign in</h1>

            {Object.values(providers).map(provider => {
                return (
                    <div key={provider.name} className="container-fluid py-2">
                        <button className="btn btn-primary btn-lg" onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                    </div>
                )
            })}

        </div>
    )
        }
export default SignIn;
export async function getServerSideProps(context) {
    const session = await getServerSession(context.req , context.res,authOptions);

    if (session){
        return {
            redirect: {
                destination: '/',
            }
        }
    }
    const providers = await getProviders();
    return {
        props: { 
            providers: providers, 
        }
    }
}