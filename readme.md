# APIs List for User Side and Admin

> [!TIP]
> Helpful advice for doing things better or more easily.

**1. SignUP API for User**

* **URL**  
    `/api/user/signup`

* **METHOD** 
    POST

* **Passed Objects**
    `userName [required],` <br />
    `mobileNumber [required],` <br />
    `password [required],` <br /> 
    `confirmPassword [required],` <br />
    `address [required],` <br />

* **Success Response**<br />
    * **Code:** `201` <br />
      **Message:** `User Created Succesfully..!` <br />
      **data:** `{ token: "token generetaed" }`

* **Error Response**
    * **Code:** `400` <br />
      **Message:** `User is already registered` <br />

**2. SignUP API for Admin (optional)**

* **URL**  
    `/api/admin/signup`

* **METHOD** 
    POST

* **Passed Objects**
    `userName [required],` <br />
    `mobileNumber [required],` <br />
    `password [required],` <br /> 
    `confirmPassword [required],` <br />
    `restro_address [required],` <br />

* **Success Response**<br />
    * **Code:** `201` <br />
      **Message:** `Admin Created Succesfully..!` <br />
      **data:** `{ token: "token generetaed" }`

* **Error Response**
    * **Code:** `400` <br />
      **Message:** `Admin is already registered` <br />

**3. Signin for the admin or the user**
* **URL**
    `/api/admin/signin`
        or
    `/api/user/signin`

* **METHOD**
    `POST`

* **PASSED OBJETCS** <br />
    ` email or username [required],` <br />
    ` password [required]` <br />

* **Success Response**<br />
    * **Code:** `200` <br />
      **Message:** ` User Logged in` <br />
      **data:** `{ token: "token generetaed", user: "user_info" }`

* **Error Response**
    * **Code:** `401` <br />
      **Message:** `Invalid password or valid email is required` <br />

* **Required Field**
     * **Auth Need : False**
    * **Admin Auth Need : False**

**4. Signout for the admin or the user**
* **URL**
    `/api/admin/signout`
        or
    `/api/user/signout`

* **METHOD**
    `POST`

`**NOTE**: in the headers you have to authorize token and you can get token by signin API`

* **Success Response**<br />
    * **Code:** `200` <br />
      **Message:** `Signout Successful` <br />
      **data:** `null`

* **Error Response**
    * **Code:** `401` <br />
      **Message:** `Authorization Required` <br />

* **Required Filed**
    * **Auth/ Admin Auth: true/true**

**5. Add Category**
* **URL**
    `/api/admin/addCategory`

* **METHOD**
    `POST`

* **PASSED OBJETCS** <br />
    ` category_title [required],` <br />
    ` category_desc [required],` <br />
    ` category_img [required]` <br />

* **Success Response**<br />
    * **Code:** `200` <br />
      **Message:** ` Category Added successfully` <br />
      **data:** `{ categoryID: "categoryID generetaed", category: "category_info" }`

* **Error Response**
    * **Code:** `401` <br />
      **Message:** `Invalid or missing details` <br />

* **Required Field**
     * **Auth Need : False**
    * **Admin Auth Need : True**

**6. Add Dishes**
* **URL**
    `/api/admin/addDish`

* **METHOD**
    `POST`

* **PASSED OBJETCS** <br />
    ` dish_name [required],` <br />
    ` dish_desc [required],` <br />
    ` dish_img [required]` <br />
    ` dish_price [required]` <br />
    ` dish_category_name [required from existing]` <br />
    ` dish_stock [required]` <br />

* **Success Response**<br />
    * **Code:** `200` <br />
      **Message:** ` Dish Added successfully` <br />
      **data:** `{ dish_categoryID: dish_categoryID, dishID: dishID, dish: "dish_info" }`

* **Error Response**
    * **Code:** `401` <br />
      **Message:** `Invalid or missing details` <br />

* **Required Field**
     * **Auth Need : False**
    * **Admin Auth Need : True**

