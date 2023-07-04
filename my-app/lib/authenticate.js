

export async function authenticateUser(user, pwd) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: `POST`,
        body: JSON.stringify({userName: user, password: pwd}),
        headers: {
            'content-type': 'application/json',
        },
    });

    const data = await res.json();

    if(res.status === 200) {
        setToken(data.token);
        return  true;
    } else  {
        throw new Error(data.message);
    }
}