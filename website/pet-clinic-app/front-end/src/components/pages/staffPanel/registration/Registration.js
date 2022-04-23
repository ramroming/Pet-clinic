// import { useState } from 'react';
// import { useEffect, useContext } from "react"
// import InputError from "../../../utils/formErrorMsg/InputError"
// import useFetch from "../../../shared/hooks/fetch-hook"
// import useSignupForm from "../../../shared/hooks/signup-form-hook"
// import { authContext } from "../../../shared/context/auth-context"
// import { pageLoadingContext } from '../../../shared/context/loading-context';
// import Modal from '../../../utils/modal/Modal';
// import dateFormat from 'dateformat';
// import PhotoInfo from '../../../utils/up_photo_info/PhotoInfo';
// import useRegisterPetForm from '../../../shared/hooks/registerpet-form-hook';


// // this data will be used in the form's date input
// const today = new Date()
// const maxDate = dateFormat(today, 'isoDate')
// const minDate = dateFormat(today.setMonth(today.getMonth() - 30 * 12), 'isoDate')

// const initialState = {
//   first_name: {
//     value: '',
//     errorMsg: ''
//   },
//   last_name: {
//     value: '',
//     errorMsg: ''
//   },
//   username: {
//     value: '',
//     errorMsg: ''
//   },
//   phone_number: {
//     value: '',
//     errorMsg: ''
//   },
//   address: {
//     value: '',
//     errorMsg: ''
//   },
//   email: {
//     value: '',
//     errorMsg: ''
//   },
//   password: {
//     value: '',
//     errorMsg: ''
//   },
//   re_password: {
//     value: '',
//     errorMsg: ''
//   },
//   dataToSend: {},
//   isLoading: false,
//   missingInput: false,
//   responseError: '',
//   responseData: {}

// }
// const initialData = {
//   pet_type: {
//     value: 'cat',
//     errorMsg: ''
//   },
//   name: {
//     value: '',
//     errorMsg: ''
//   },
//   gender: {
//     value: 'male',
//     errorMsg: ''
//   },
//   birth_date: {
//     value: maxDate,
//     errorMsg: ''
//   },
//   photo: {
//     value: '',
//     url: '',
//     errorMsg: ''
//   },
//   breed_name: {
//     value: '',
//     errorMsg: ''
//   },
//   missingInput: false,
//   isLoading: false,
//   responseData: null,
//   responseError: '',
//   isLoadingBreeds: false,
//   isLoadingColors: false,
//   breeds: [],
//   colors: [],
//   dataToSend: {},
//   selectedColors: []
// }


// const Registration = () => {

//   const [registerUser, setRegisterUser] = useState(false)
//   const [registerPet, setRegisterPet] = useState(false)


//   // using the form-hook
//   const [state, dispatch] = useSignupForm(initialState)

//   // using the fetch hook
//   const sendRequest = useFetch()


//   const auth = useContext(authContext)

//   const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading



//   const submitForm = async (event) => {
//     event.preventDefault()
//     dispatch({ type: 'validate' })
//   }
  

//   // if we have async operation inside use effect we have to wrap the operation with an async function inside the useeffect and then we should call the same function again inside the useEffect without using await
//   useEffect(() => {


//     // wrapper function to enable us to use async functions inside useEffect
//     const fetchUser = async () => {
//       try {
//         const parsedData = await sendRequest(
//           'http://localhost:5000/users',
//           'POST', JSON.stringify(state.dataToSend),
//           {
//             'Content-Type': 'application/json'
//           })
//         if (parsedData)
//           dispatch({ type: 'success', data: parsedData })
//       } catch (e) {
//         dispatch({ type: 'failure', error: e.message })
//       }

//     }

//     // isLoading changes from false to true if the validation process  passed successfully 
//     if (state.isLoading) {
//       fetchUser()
//     }
//   }, [state.dataToSend, state.isLoading, sendRequest, auth, dispatch])

//   useEffect(() => {
//     setPageIsLoading(state.isLoading)
//   }, [state.isLoading, setPageIsLoading])


//   const [state2, dispatch2] = useRegisterPetForm(initialData)
//   const sendRequest2 = useFetch(dispatch2)




//   useEffect(() => {
//     let isMount = true
//     if (isMount)
//       dispatch2({ type: 'getBreeds' })

//     const getBreeds = async () => {
//       try {

//         const parsedData = await sendRequest2(`http://localhost:5000/pets/breeds?pet_type=${state2.pet_type.value}`, 'GET', null, {
//           'Authorization': `Bearer ${auth.token}`
//         })
//         if (parsedData && isMount)
//           dispatch2({ type: 'getBreedsSuccess', data: parsedData })
//       } catch (e) {
//         if (isMount)
//           dispatch2({ type: 'failure', data: e.message })
//       }
//     }


//     getBreeds()

//     return () => {
//       setPageIsLoading(false)
//       isMount = false
//     }
//   }, [state2.pet_type, sendRequest2, auth.token, dispatch2, setPageIsLoading])

//   useEffect(() => {
//     let isMount = true
//     if (isMount)
//       dispatch2({ type: 'getColors' })

//     const getColors = async () => {
//       try {

//         const parsedData = await sendRequest2(`http://localhost:5000/pets/colors`, 'GET', null, {
//           'Authorization': `Bearer ${auth.token}`
//         })
//         if (parsedData && isMount)
//           dispatch2({ type: 'getColorsSuccess', data: parsedData })
//       } catch (e) {
//         if (isMount)
//           dispatch2({ type: 'failure', data: e.message })
//       }
//     }


//     getColors()

//     return () => {
//       setPageIsLoading(false)
//       isMount = false
//     }
//   }, [sendRequest2, auth.token, dispatch2, setPageIsLoading])


//   useEffect(() => {
//     let isMount = true
//     const registerPet = async () => {

//       try {
//         const parsedData = await sendRequest2(`http://localhost:5000/users/me/pets/`, 'POST', state2.dataToSend, {
//           'Authorization': `Bearer ${auth.token}`
//         })
//         if (parsedData && isMount) {
//           dispatch2({ type: 'success', data: parsedData })
//         }

//       } catch (e) {
//         if (isMount)
//           dispatch2({ type: 'failure', error: e.message })
//       }
//     }

//     if (state2.isLoading) {
//       registerPet()
//     }
//     return () => {
//       setPageIsLoading(false)
//       isMount = false
//     }

//   }, [state2.isLoading, auth.token, sendRequest2, state2.dataToSend, dispatch2, setPageIsLoading])
//   const submitFormPet = (e) => {
//     e.preventDefault()
//     dispatch2({ type: 'validate' })
//   }

//   useEffect(() => {
//     setPageIsLoading(state2.isLoading || state2.isLoadingBreeds)
//   }, [state2.isLoading, state2.isLoadingBreeds, setPageIsLoading])

//   const selectColor = (event) => {
//     dispatch2({ type: 'selectColor', color: event.target.innerHTML })
//   }

//   return (
//     <>
//       {state.responseData.token &&
//         <Modal
//           modalClass='success'
//           header='Success!!'
//           body={'Client has been registered successfully'}
//           dispatch={dispatch}
//           refresh={true}
//         />}
//       <h4>Registration</h4>
//       <div className="flex-row  fjust-center gap-16p">
//         <button className="btn-rec-purple rec-register"
//           onClick={() => {
//             setRegisterUser(!registerUser)
//             if (registerPet)
//               setRegisterPet(false)
//           }}>
//           Register a client
//         </button>
//         <button className="btn-rec-purple  rec-register"
//           onClick={() => {
//             setRegisterPet(!registerPet)
//             if (registerUser)
//               setRegisterUser(false)
//           }}>
//           Regsiter a pet
//         </button>
//       </div>
//       <div className="flex-col falign-center" style={{ paddingTop: '1rem' }}>
//         {registerUser &&
//           <form className="form-container flex-col gap-16p falign-center" action="/" method="POST"
//             onSubmit={(e) => submitForm(e)}>
//             <a className="logo-link" href="/#">
//               <img src="/media/imgs/favicon.png" alt="" className="logo" />
//             </a>

//             {/* <div className="x-close-panel"><button
//                 onClick={() =>setRegisterUser(false)}>
//                 <i className="fa-solid fa-xmark"></i></button></div> */}

//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="first_name">First Name:*
//               </label>
//               <input type="text" name="first_name" id="first_name" onChange={(e) => { dispatch({ type: 'enterValue', field: 'first_name', value: e.currentTarget.value }) }} />
//             </div>

//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="last_name">Last Name:*
//               </label>
//               <input type="text" name="last_name" id="last_name" onChange={(e) => { dispatch({ type: 'enterValue', field: 'last_name', value: e.currentTarget.value }) }} />
//             </div>

//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="username">Username:*
//               </label>
//               <input type="text" name="username" id="username" onChange={(e) => { dispatch({ type: 'enterValue', field: 'username', value: e.currentTarget.value }) }} />
//               {state.username.errorMsg && <InputError class='error-msg' msg={state.username.errorMsg} />}
//             </div>



//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="phone_number">Phone Number:
//               </label>
//               <input type="text" name="phone_number" id="phone_number" placeholder="eg. 506 022 23 80"
//                 onChange={(e) => { dispatch({ type: 'enterValue', field: 'phone_number', value: e.currentTarget.value }) }}
//                 onBlur={() => { dispatch({ type: 'blurPhone' }) }} />

//               {state.phone_number.errorMsg && <InputError class='error-msg' msg={state.phone_number.errorMsg} />}
//             </div>



//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="address">Address:*
//               </label>
//               <textarea name="address" id="address" cols="30" rows="4" onChange={(e) => { dispatch({ type: 'enterValue', field: 'address', value: e.currentTarget.value }) }}></textarea>
//             </div>

//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="email">Email:*
//               </label>
//               <input type="text" name="email" id="email" placeholder="example@gmail.com"
//                 onChange={(e) => { dispatch({ type: 'enterValue', field: 'email', value: e.currentTarget.value }) }}
//                 onBlur={() => { dispatch({ type: 'blurEmail' }) }}
//               />
//               {state.email.errorMsg && <InputError class='error-msg' msg={state.email.errorMsg} />}

//             </div>

//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="password">Password:*
//               </label>
//               <input type="password" name="password" id="password"
//                 onChange={(e) => { dispatch({ type: 'enterValue', field: 'password', value: e.currentTarget.value }) }}
//                 onBlur={() => { dispatch({ type: 'blurPassword' }) }}
//               />
//               {state.password.errorMsg && <InputError class='error-msg' msg={state.password.errorMsg} />}
//             </div>

//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="rePassword">Re-password:*
//               </label>
//               <input type="password" name="rePassword" id="rePassword"
//                 onChange={(e) => { dispatch({ type: 'enterValue', field: 're_password', value: e.currentTarget.value }) }}
//                 onBlur={() => { dispatch({ type: 'blurRePassword' }) }}
//               />
//               {state.re_password.errorMsg && <InputError class='error-msg' msg={state.re_password.errorMsg} />}
//             </div>

//             {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
//             {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>}

//             <div className="button-wrapper flex-row gap-8p fjust-center">


//               <button type="submit" className={state.isLoading ? "btn-r btn-r-dark disabled" : "btn-r btn-r-dark"} disabled={state.isLoading}>
//                 Register Client
//               </button>


//             </div>
//           </form>

//         }
//         {registerPet &&
//           <form
//             className="form-container flex-col gap-16p falign-center"
//             onSubmit={(e) => submitFormPet(e)}
//           >

//             <div className="input-wrapper flex-col gap-8p">

//               <label className="full-label" htmlFor="type_name">Select your pet:*
//               </label>

//               <div className="flex-row fjust-evenly icons-wrapper">

//                 {state2.pet_type.errorMsg && <InputError class='error-msg' msg={state2.pet_type.errorMsg} />}
//                 <label
//                   onClick={() => dispatch2({ type: 'enterValue', value: 'cat', field: 'pet_type' })}
//                 >
//                   <input
//                     className="radio-img"
//                     type="radio"
//                     name="pet_type"
//                     id="type_name"
//                     defaultChecked
//                   />
//                   <img
//                     className="pet-icon" src="/media/imgs/cat-icon.png" alt="" />
//                 </label>

//                 <label
//                   onClick={() => dispatch2({ type: 'enterValue', value: 'dog', field: 'pet_type' })}
//                 >
//                   <input
//                     className="radio-img"
//                     type="radio"
//                     name="pet_type"
//                     id="type_name"
//                   />
//                   <img
//                     className="pet-icon" src="/media/imgs/dog-icon.jpg" alt="" />
//                 </label>

//                 <label onClick={() => dispatch2({ type: 'enterValue', value: 'bird', field: 'pet_type' })}
//                 >
//                   <input
//                     className="radio-img"
//                     type="radio"
//                     name="pet_type"
//                     id="type_name"
//                   />
//                   <img
//                     className="pet-icon low-op" src="/media/imgs/bird-icon.png" alt="" />
//                 </label>

//               </div>

//             </div>

//             <div className="input-wrapper flex-row fjust-between">
//               <label
//                 className="half-label"
//                 htmlFor="name">Pet Name:*
//               </label>
//               <input
//                 onChange={(e) => dispatch2({ type: 'enterValue', field: 'name', value: e.currentTarget.value })}
//                 type="text"
//                 name="name"
//                 id="name" />
//             </div>

//             <div className="input-wrapper flex-col gap-8p">
//               <label
//                 className="half-label"
//                 htmlFor="gender">Pet Gender:*
//               </label>
//               <div className="input-wrapper flex-row fjust-around">
//                 <div
//                   onClick={() => dispatch2({ type: 'enterValue', field: 'gender', value: 'male' })}
//                   className="flex-row radio-wrapper fjust-center gap-8p">
//                   <input
//                     type="radio"
//                     name="gender"
//                     id="male"
//                     value="male"
//                     defaultChecked />
//                   <label
//                     htmlFor="male">Male</label>
//                 </div>
//                 <div
//                   onClick={() => dispatch2({ type: 'enterValue', field: 'gender', value: 'female' })}
//                   className="flex-row radio-wrapper fjust-center gap-8p">
//                   <input
//                     type="radio"
//                     name="gender"
//                     id="female"
//                     value="female" />
//                   <label
//                     htmlFor="female">Female</label>
//                 </div>
//               </div>


//             </div>


//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="birth_date">Birth Date:*
//               </label>
//               <input
//                 onChange={(e) => { dispatch2({ type: 'enterValue', value: e.currentTarget.value, field: 'birth_date' }) }}
//                 type="date"
//                 name="birth_date"
//                 id="birth_date"
//                 value={state2.birth_date.value}
//                 min={minDate}
//                 max={maxDate} />
//             </div>

//             <div className="input-wrapper flex-row fjust-between">
//               {
//                 state2.photo.errorMsg &&

//                 <InputError class='error-msg' msg={state2.photo.errorMsg} />

//               }
//               <label className="half-label">Photo:
//               </label>
//               <label htmlFor="photo" className="btn-r btn-r-outlined-blue flex-row fjust-between">
//                 Press to upload
//                 <i className="fas fa-upload"></i>
//               </label>
//               <input
//                 onChange={(e) => {
//                   if (e.currentTarget.files.length !== 0)
//                     return dispatch2({ type: 'uploadPhoto', field: 'photo', value: e.currentTarget.files[0], url: URL.createObjectURL(e.currentTarget.files[0]) })
//                   return
//                 }}
//                 type="file"
//                 name="photo"
//                 id="photo"
//                 accept=".png, .jpg, .jpeg" />

//             </div>
//             {state2.photo.url &&
//               <PhotoInfo
//                 fileURL={state2.photo.url}
//                 fileName={state2.photo.value.name}
//                 fileSize={Math.round(state2.photo.value.size / 1000)} />
//             }

//             <div className="input-wrapper flex-row fjust-between">
//               <label className="half-label" htmlFor="breed_name">Select Breed:*
//               </label>
//               <select
//                 onChange={(e) => dispatch2({ type: 'enterValue', field: 'breed_name', value: e.currentTarget.value })}
//                 name="breed_name"
//                 id="breed_name">
//                 <option value="">Select a Breed</option>
//                 {state2.breeds && state2.breeds.map((breed, index) => {
//                   return <option key={index} value={breed.name}>{breed.name}</option>
//                 })}
//               </select>

//             </div>
//             <div className=" input-wrapper flex-row fjust-start">
//               <label className="">Select pet colors Max 3:
//               </label>
//             </div>
//             <div className="input-wrapper flex-row">

//               {state2.colors && state2.colors.length !== 0 && !state2.isLoadingColors && state2.selectedColors &&
//                 state2.colors.map((color, index) => {
//                   return (
//                     <div
//                       className={state2.selectedColors.length !== 0 && state2.selectedColors.includes(color.name) ? "color-tag color-selected" : "color-tag"}
//                       key={index}
//                     >
//                       <p
//                         onClick={(event) => {
//                           selectColor(event)
//                         }}
//                         colorid={index}
//                       >{color.name}</p>
//                     </div>
//                   )
//                 })

//               }

//             </div>
//             {state2.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
//             {state2.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state2.responseError}</p>}


//             <div className="button-wrapper flex-row gap-8p fjust-center">

//               <button type="submit" className="btn-r btn-r-dark">
//                 Register Pet
//               </button>


//             </div>
//           </form>
//         }
//       </div>
//     </>
//   )
// }

// export default Registration