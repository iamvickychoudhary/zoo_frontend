import { createRouter, defineEventHandler, useBase, readBody, useSession } from 'h3';

const router = createRouter()
router.post('/login', defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    const userAuth = await fetch(`${config.BaseUrl}/api/v1/users/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: body.email, password: body.password })
    });

    const data = await userAuth.json();
    // Use useSession to manage session data
    const session = await useSession(event, {
      password: config.SessionPassword,
    });

    // Store the token in session data
    await session.update({
      token: data.token,
    });
    if (!userAuth.ok) {
      return createError({
          statusCode: 401,
          statusMessage: 'Unauthorized'
      });
  }

    return {
      status: "success",
      message: "login successfull",
    };

  } catch (error) {
    console.log("Error", error);
  }
}));

 export default useBase('/api/auth', router.handler)

