const apiUrl = 'https://react-node-crm.herokuapp.com';
export const getUsers = () => {
    return fetch(`${apiUrl}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.jwtToken,
      },
    })
      .then(res => res.json())
}

export const deleteUser = (id) => {
  return fetch(`${apiUrl}/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwtToken,
    },
  })
    .then(res => res.json())
}

export const createUser = (opts) => {
    const data = {...opts, 'isAdmin': opts.isAdmin === 'admin', 'password2': opts.password};

    return fetch(`${apiUrl}/api/users/register`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.jwtToken,
      },
    }).then(function(response) {
      return response.json();
    })
}

export const updateUser = (opts) => {
  const data = {...opts, 'isAdmin': opts.isAdmin === 'admin', 'password2': opts.password};

  return fetch(`${apiUrl}/api/users/${opts._id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwtToken,
    },
  }).then(function(response) {
    return response.json();
  })
}

export const login = (cred) => {
  return fetch(`${apiUrl}/api/users/login`, {
    method: 'post',
    body: JSON.stringify(cred),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function(response) {
    return response.json();
  })
}

export const createLead = data => {
  return fetch(`${apiUrl}/api/leads`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwtToken,
    },
  }).then(function(response) {
    return response.json();
  })
}

export const updateLead = data => {
  return fetch(`${apiUrl}/api/leads/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwtToken,
    },
  }).then(function(response) {
    return response.json();
  })
}

export const getLeads = (id) => {
  return fetch(`${apiUrl}/api/leads/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwtToken,
    },
  })
    .then(res => res.json())
}

export const deleteLead = (id) => {
  return fetch(`${apiUrl}/api/leads/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwtToken,
    },
  })
    .then(res => res.json())
}

