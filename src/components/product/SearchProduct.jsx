import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link, useParams } from 'react-router-dom'

const SearchProduct = () => {
    const {products} = useContext(AppContext)
    const [searchProduct, setSearchProduct] = useState([])
    const {term} = useParams();
    useEffect(() => {
      setSearchProduct(products.filter((data)=>data?.title?.toLowerCase().includes(term.toLowerCase())))
    }, [term,products])
    

  return (
    <>
        {/* <hr /> */}
        <div className="container mt-3">
          {searchProduct?.map((product) => (
            <div key={product._id}>
                <div className="card">
                    <Link to={`/product/${product._id}`}>
                        <img className="img2 card-img-top"  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFxUXFxcXFRoVHRoXFRUXFxUaGhUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJRABAQACAgICAQUBAQAAAAAAAPABcRHhYfFR0cECIUGBkaES/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOIAoIvAgKAAAALlALRdqAW0XICHBhQQUBBQEMgCKAIcgACgn+qnPkABQRQAAAW6L0oJm8F2t7TAGLyXRegC0WlL2CcX5LYXoAtLwYBOL8imQZGk4BAAEUBBUBf7wJxkBUFAtAAW1wAFozfZeyvALbLovQCWltGAEW2F6AxfRaDm+wS7W2leFvQF0loXACXa8pXgC2l0uboBLQZK8AcAAnAKAAAphAW0GLsAtrdIAtoteUUDgthegLpLS15L2BdltFvQF0WgvYIt2XtK8Af9/JdF6WvIJaLs5vswBbQAAABAFAAUwAttABS0gCiV4LegW6LQWtgXZbK8JegUtIXsBUwAttLpb0leQLS3Zi7QC2XQAIoCAZyAHIAAC4BQDhLpbQJheEuzF5AW0nN+C0C8CKAnJbAAtF2BgAC0qcXwXYLbELYAXRaAryl7W7LYIZLoA/rCpx4AFwAHC5RbQHBhLs4vkAvRxfgtAV5L2XZxfIBktl0Ai2i7AMV8FsugFS0XYHF9rey2WwSvBei6LQFeVxdpm+y2BxX8Gboui0AgAf6H/ryAAAq4u0uy2BXhb0XRaAL2YS2AF0AXoLRdgYuwtgF6C0l2C3svZi8gKIWgC9rdpbArwXpeb8FoEyi5QAAD/A48YAMAoBegAryLnCcAAAIt6ALSKAIoAACKHAIvN9nFfycX2BXgvQt6BkUAReb7QC2F6ATjwqf6AvAAKAACgnF8l0t6MV8glo4vyvF9pXgDi+S6M3QBaA5AyqZL0C3SWjBewLstleDm+gLotFeQC7LsygFsulzdIBaLsvYB/YfuoIIAq4TCgpdJeivILaLs5vtAW2l0XpQTm+C7AAADF9FpMgLjN+VtoZugW6S0LewLXlM4vnyAFsujIBm8IqAWwygL/SsfsA0JycgpjIAWlu0vYC2y6EBq0IAttAyAvN8Il7BRFtgV4M3jRdFoFLaYQGub5SvBbLoDF4E5vgAABA5ATnyACgApgQFAAVDAKgAKgAAAt6QtApe0AUS2AubpAAC2AcIAAAAAAAAACooJyvIACKBgEAAwAqKACYyCotoAQOQAAAwAAAcqnCgi4/kAZ/UoAfAAL+lFAAAQADC5AEyZADJgAQ+wA/UYADBgARoAQx/CgIAD/9k=" alt="" />
                        <img src={product.imgSrc} className="card-img-top" alt="..." />
                    </Link>   
                    
                    <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <span style={{ color: "red", fontWeight: "bold" }}>
                        &#8377;{product.price.toLocaleString("en-IN")}
                    </span>
                    <p className="card-text"></p>
                    <button type="button" className="btn btn-outline-dark btn1">
                        Cart
                    </button>
                    <button type="button" className="btn btn-outline-danger">
                        Buy
                    </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
    </>
  )
}

export default SearchProduct