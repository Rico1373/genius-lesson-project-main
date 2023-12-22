const userList = document.getElementById("userList");


// api functions
const BASE_URL = "http://localhost:5000";

const api = {
  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/users/all`);
    return response.json();
  },
 
  createUser: async (user) => {
    const response = await fetch(`${BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  updateUser: async (id, updatedUser) => {
    const response = await fetch(`${BASE_URL}/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${BASE_URL}/users/delete/${id}`, {
      method: "POST",
    });

    if (response.status === 404) {
      throw new Error("User not found");
    }

    if (response.status === 201) {
      console.log('User Successful Deleted !');
    }
  },
};

// Show Users
////////////////////////////////////////////////////////
function addElement(user) {
  userList.insertAdjacentHTML(
    "afterbegin",
    `
        <div id="${user._id}" class="userRow">
          <div  class="fullName">${user.name}</div>
          <div  class="email">${user.email}</div>
          <div class="actions">
            <div  class="userAction btnEdit">ED</div>
            <div id ='${user.phone}' class="userAction btnPhone">PH</div>
            <div  class="userAction btnDelete">OK</div>
          </div>
        </div>
        `,
  );
}

function displayUsers() {
  api
    .getUsers()
    .then((users) => {
      users.map((user) => {
        addElement(user);
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

document.addEventListener("DOMContentLoaded", displayUsers);
////////////////////////////////////////////////////////////////////////
// Update user

let isEditing = false;
let userEmail;
let userName;



function enableEditingMode(rowEmail,rowName) {
  rowEmail.innerHTML = `<input type="text" id="editEmail" value="${rowEmail.innerHTML}" />`;
  rowName.innerHTML = `<input type="text" id="editName" value="${rowName.innerHTML}" />`;
  isEditing = true;
}

function disableEditingMode(rowEmail,rowName,newEmail,newName) {
  rowEmail.innerHTML = newEmail;
  rowName.innerHTML = newName;
  isEditing = false;
};

async function updateUserOnEnter(id, updatedUser) {
  try {
    const response = await api.updateUser(id, updatedUser);
    console.log("User updated:", response);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

document.addEventListener('click', (event) => {
  const target = event.target;
  event.stopPropagation();

  if (target.classList.contains('btnEdit')) {
    const userRow = target.closest('.userRow');

    if (userRow) {
      const rowEmail = userRow.querySelector('.email');
      const rowName = userRow.querySelector('.fullName');
  
      // Отримуємо id користувача
      const userId = userRow.id;
  

      if (isEditing) {
        const editedEmail = document.getElementById('editEmail');
        const editedName = document.getElementById('editName');
    

        const updatedUser = {
          name: editedName.value,
          email: editedEmail.value,
        };
       

        disableEditingMode(rowEmail,rowName,editedEmail.value, editedName.value);
     
        updateUserOnEnter(userId, updatedUser);
       
      } else {
         enableEditingMode(rowEmail, rowName);
      }

      
    }
  }
});


//////////////////////////////////////////////////////////////

// Delete User


async function submitUserDeleting(id) {
  try {
    await api.deleteUser(id);
    
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

document.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('btnDelete')) {
    const userRow = target.closest('.userRow');

    if (userRow) {      
      const userId = userRow.id;
      submitUserDeleting(userId)
    }
  }
})

////////////////////////////////////////
//Create User
const modalForm = document.getElementById('modal-form');
const contactForm = document.getElementById('contact-form');

function getFormData(formId) {
  const form = document.getElementById(formId);

  if (!form) {
    console.error(`Form with ID '${formId}' not found`);
    return;
  }

  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  return formObject;
}


modalForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = getFormData('modal-form');

  createUser(formData);
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = getFormData('contact-form');

  createUser(formData);
});

function createUser(formData) {
  try {
    api.createUser(formData);
  } catch (err) {
    console.log(err);
  }
}



function makeCall(phoneNumber) {
  
  const link = document.createElement("a");

  link.href = `tel:${phoneNumber}`;

  link.click();
  setTimeout(() => {
    link.remove();
  }, 1000); 
}


document.addEventListener('click', (event) => {
   const target = event.target;

   if (target.classList.contains("btnPhone")) {
     const phoneNumber = target.id;

     makeCall(phoneNumber);
   }
})