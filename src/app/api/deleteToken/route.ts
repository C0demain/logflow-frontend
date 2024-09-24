import { cookies } from "next/headers";

export async function DELETE() {
    const cookiesStore = cookies();
    cookiesStore.delete('token');

    return new Response(JSON.stringify({ message: 'Logout realizado' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
