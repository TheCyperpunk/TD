import { useState, useEffect, useRef } from "react";
import "./mp.css";

const EWasteMarketplace = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({ title: "", description: "", price: "" });
    const [image, setImage] = useState(null);
    const [capturing, setCapturing] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null); // Added for resetting file input

    // Fetch products from the database
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]); // Store the selected image
        }
    };

    const startCamera = () => {
        setCapturing(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => console.error("Error accessing camera:", err));
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
                setImage(file);
                setCapturing(false);
                setShowForm(true);
                video.srcObject.getTracks().forEach(track => track.stop()); // Stop camera
            }
        }, "image/jpeg");
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCapturing(false);
    };

    const addProduct = () => {
        if (!newProduct.title || !newProduct.description || !newProduct.price || !image) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", newProduct.title);
        formData.append("description", newProduct.description);
        formData.append("price", newProduct.price);
        formData.append("image", image);

        fetch("http://localhost:5000/products", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            setProducts([...products, data]);
            setShowForm(false);
            setNewProduct({ title: "", description: "", price: "" });
            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
        })
        .catch((err) => console.error("Error adding product:", err));
    };

    return (
        <div className="marketplace">
            <div className="marketplace-bg"></div>
            <div className="content-wrapper">
                <h2>E-Waste Marketplace</h2>
                <button 
                    className="toggle-form-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Form" : "Add Product"}
                </button>

                {showForm && (
                    <div className="add-product">
                        <input type="text" name="title" placeholder="Product Title" value={newProduct.title} onChange={handleChange} />
                        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
                        <input type="number" name="price" placeholder="Price ($)" value={newProduct.price} onChange={handleChange} />

                        <div className="image-options">
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
                            <button onClick={startCamera}>Capture Image</button>
                        </div>

                        {capturing && (
                            <div className="camera-preview">
                                <video ref={videoRef} autoPlay playsInline />
                                <button className="capture-button" onClick={captureImage}>📸 Take Photo</button>
                                <button className="cancel-button" onClick={stopCamera}>❌ Cancel</button>
                            </div>
                        )}

                        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

                        {image && <p>Image selected!</p>}

                        <button onClick={addProduct}>Post Product</button>
                    </div>
                )}

                <div className="product-list">
                    {products.length === 0 ? (
                        <p>No products available.</p>
                    ) : (
                        products.map((product) => (
                            <div className="product-card" key={product._id}>
                                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} />
                                <div className="product-content">
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <p><strong>${product.price}</strong></p>
                                    <button className="buy-button">Buy Now</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EWasteMarketplace;
