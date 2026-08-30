const panels = {
  login: document.getElementById("login-form"),
  register: document.getElementById("register-form"),
  forgot: document.getElementById("forgot-form"),
};

const rememberedEmail = localStorage.getItem("rememberedEmail");
if (rememberedEmail) {
  panels.login.email.value = rememberedEmail;
  panels.login.remember.checked = true;
}

function showPanel(name) {
  Object.values(panels).forEach((form) => form.classList.remove("active"));
  panels[name].classList.add("active");
  panels[name].querySelector("input")?.focus();
}

function setStatus(form, message) {
  const status = form.querySelector(".status");
  status.textContent = message;
}

document.querySelectorAll("[data-show]").forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.show));
});

panels.login.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = panels.login.email.value.trim();
  const password = panels.login.password.value;

  if (!email || !password) {
    setStatus(panels.login, "Enter your email and password.");
    return;
  }

  if (panels.login.remember.checked) {
    localStorage.setItem("rememberedEmail", email);
  } else {
    localStorage.removeItem("rememberedEmail");
  }

  setStatus(panels.login, "Logged in (demo).");
});

panels.register.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = panels.register.password.value;
  const confirm = panels.register.confirm.value;

  if (password !== confirm) {
    setStatus(panels.register, "Passwords do not match.");
    return;
  }

  setStatus(panels.register, "Account created (demo).");
});

panels.forgot.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = panels.forgot.email.value.trim();

  if (!email) {
    setStatus(panels.forgot, "Enter the email for your account.");
    return;
  }

  setStatus(panels.forgot, "Reset link sent (demo).");
});
