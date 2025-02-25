import React from "react";
import "./clothlist.css";

const donationSites = [
    {
        name: "Goodwill",
        logo: "https://www.goodwill.org/wp-content/uploads/2019/06/cropped-Goodwill-Industries-International-Logo-1.jpg",
        description: "Goodwill accepts clothing donations and sells them to support community programs.",
        link: "https://www.goodwill.org/donate/"
    },
    {
        name: "The Salvation Army",
        logo: "https://static.salvationarmy.org/us-east-1/templates/symphony/static_resources/images/global/shield.svg",
        description: "Donate clothes to The Salvation Army to help those in need.",
        link: "https://www.salvationarmyusa.org/usn/ways-to-give/"
    },
    {
        name: "ThredUp",
        logo: "https://www.thredup.com/tup-assets/pwa/production/assets/logo-slogan-2d3cb7310537d35c9449.svg",
        description: "ThredUp allows you to send old clothes and earn credit or donate proceeds to charity.",
        link: "https://www.thredup.com/"
    },
    {
        name: "H&M Garment Collecting",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
        description: "H&M stores accept old clothes for recycling and offer store discounts in return.",
        link: "https://www2.hm.com/en_us/customer-service/recycling.html"
    },
    {
        name: "Donatekart",
        logo: "https://give.do/static/img/logos/1ALK/a210b644-1b2e-4480-a0d8-81c40b63a9be.jpg",
        description: "An online platform allowing donors to contribute essential products.",
        link: "https://donatekart.com/"
    }
];

const ClothingDonation = () => {
    return (
        <div className="donation-container">
            <h2>Donate Your Old Clothes</h2>
            <div className="card-grid">
                {donationSites.map((site, index) => (
                    <div className="donation-card" key={index}>
                        <img src={site.logo} alt={site.name} className="donation-logo" />
                        <h3>{site.name}</h3>
                        <p>{site.description}</p>
                        <a href={site.link} target="_blank" rel="noopener noreferrer" className="donate-button">
                            <span>Visit Website</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClothingDonation;
