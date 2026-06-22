export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const data = await res.json();
  return data;
}

export async function getProductById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const data = await res.json();
  return data;
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  return res.json();
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    throw new Error('Error al registrar usuario');
  }

  return res.json();
}

export async function addToCart(productId: number, quantity: number, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
}

export async function getCart(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function createOrder(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al crear la orden');
  }

  return res.json();
}

export async function removeFromCart(itemId: number, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function updateCartItem(itemId: number, quantity: number, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
}