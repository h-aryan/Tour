/*eslint-disable */
const login = async (email, password) => {
  console.log(email, password);

  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      alert("Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.error(err);
    const message =
      err.response?.data?.message || "An error occurred. Please try again.";
    alert(`Login failed: ${message}`);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      alert("Logged out successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.error(err);
    alert("Error logging out. Please try again.");
  }
};

const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/update-password",
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      alert("Password updated successfully! Redirecting to home page...");
      window.setTimeout(() => {
        location.assign("/"); // Redirect to home page
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login(email, password);
  });
}

const logoutButton = document.querySelector(".nav__el--logout");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}

document
  .querySelector(".form-user-settings")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const passwordCurrent = document.querySelector("#password-current").value;
    const password = document.querySelector("#password").value;
    const passwordConfirm = document.querySelector("#password-confirm").value;

    updatePassword(passwordCurrent, password, passwordConfirm);
  });
