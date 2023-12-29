import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = () => {
    return json ({ message: "Hello World"});
}

export const action = async ({ request }) => {
    const body = await request.formData();
    console.log(body.get('first_name'))
    console.log(body.get('last_name'))
    return Object.fromEntries(body.entries())
}

export default function Data() {
    const loaderData = useLoaderData();
    const actionData = useActionData();
    return (
        <div>
            <Form method = "POST">
                <input name = "first_name" />
                <input name = "last_name" />
                <button>Submit</button>
         </Form>
         <div>
            Name: {" "}
            {actionData ? `${actionData.first_name} ${actionData.last_name}` : null }
         </div>
         <div>
            {loaderData.message}
         </div>
        </div>
    );
}