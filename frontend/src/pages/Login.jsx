import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  const res = await fetch("http://localhost:4000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
console.log("Respuesta del servidor:", data);

if (data.token) {
  localStorage.setItem("token", data.token);
  onLogin(); // pasaremos esta función después
}
};


  return (
    <div style={{ padding: "2rem" }}>
      <h2>Iniciar sesión</h2>

      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input 
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
