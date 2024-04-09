import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { db, storage } from '../firebase/config'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { checkValidData } from '../validation/sellProductValidate'


const SellProducts = () => {

    const navigate = useNavigate()
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState(null)
    const fileInputRef = useRef('')

    const { user } = useContext(UserContext)


    const handleSubmit = async () => {
        const message = checkValidData(productName, category, price, location);
        toast(message);

        if (message == null) {
            if (image === null) {
                toast.error('Please select an image before submitting');
                return;
            }

            try {
                const imageRef = storageRef(storage, `image/${image.name}`);
                const snapshot = await uploadBytes(imageRef, image);
                const url = await getDownloadURL(snapshot.ref);

                const usersCollectionRef = collection(db, "Products");
                const date = new Date();
                await addDoc(usersCollectionRef, {
                    name: productName,
                    category: category,
                    price: price,
                    location: location,
                    imageUrl: url,
                    userId: user.uid,
                    createdAt: date.toDateString()
                });

                setProductName('');
                setCategory('');
                setLocation('');
                fileInputRef.current.value = '';
                setImage(null);
                setPrice('');
                toast.success('Product added successfully');
                navigate('/');
            } catch (error) {
                toast.error(error.message);
            }
        }
    };




    return (
        <div className='bg-gray-100 grid grid-cols-12 pb-5' >
            <span className='col-span-4'></span>
            <div className='col-span-4 m-10 bg-white rounded-xl' >
                <Link to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-7 w-7 h-7 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </Link>
                <div className='mx-auto text-center' >
                    <img className='p-2 w-24 mx-auto' src="/olx-logo.png" alt="" />

                    <h1 className='font-bold text-xl mt-6'>Sell your Product</h1>
                    <input onChange={(e) => setProductName(e.target.value)} value={productName} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-10 border-black' type="text" placeholder='Product Name' />
                    <input onChange={(e) => setCategory(e.target.value)} value={category} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="text" placeholder='Category' />
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="text" placeholder='Price' />
                    <input onChange={(e) => setLocation(e.target.value)} value={location} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="text" placeholder='Location' />

                    {
                        image !== null ?

                            <img className='py-2 px-2 border-2 w-3/4 rounded-lg mx-auto mt-4 ' src={image !== null ? URL.createObjectURL(image) : null} alt="//" />
                            :
                            null
                    }
                    <div>
                        <label className='text-start ms-16 rounded-lg mt-5 block' htmlFor="">Choose a Picture</label>
                        <input ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-1 border-black' type="file" placeholder='Choose' />
                    </div>

                    <button onClick={handleSubmit} className='w-3/4 bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-10 mb-16'>Create</button>


                </div>

            </div>

        </div>
    )
}

export default SellProducts