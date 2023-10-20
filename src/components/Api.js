class Api {
  constructor({ baseUrl, authToken, headers }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // _request(url, options) {
  //   const requestOptions = {
  //     headers: {
  //       authorization: this._authToken,
  //       ...options.headers,
  //     },
  //     ...options,
  //   };

  //   return fetch(url, requestOptions).then(this._checkResponse);
  // }

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: {
  //       authorization: this._authToken,
  //     },
  //   })
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  //     )
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     headers: {
  //       authorization: this._authToken,
  //     },
  //   })
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  //     )
  //     .catch((err) => {
  //       console.error("Error:", err);
  //       throw err;
  //     });
  // }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // getInitialCards() {
  //   return this._request(`${this._baseUrl}/cards`, {
  //     headers: {},
  //   });
  // }

  // updateProfile(inputValues) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: {
  //       authorization: this._authToken,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: inputValues.name,
  //       about: inputValues.description,
  //     }),
  //   })
  //     .then((res) => this._processResponse(res))
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // }

  updateProfile(inputValues) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.description,
      }),
    }).then(this._checkResponse);
  }

  // addCard({ name, link }) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "POST",
  //     headers: {
  //       authorization: this._authToken,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       link,
  //     }),
  //   })
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  //     )
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // }

  addCard({ title, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  // removeCardOnServer(cardId) {
  //   console.log(cardId);
  //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: this._authToken,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  removeCardOnServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // likeCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: {
  //       authorization: this._authToken,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  //     )
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // unlikeCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: this._authToken,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  //     )
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // updateProfileAvatar(avatar) {
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: {
  //       authorization: this._authToken,
  //       "Content-Type": "application/json", // Include the Content-Type header
  //     },
  //     body: JSON.stringify({ avatar }),
  //   })
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  //     )
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // }

  updateProfileAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

export default Api;
