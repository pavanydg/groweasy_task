"use client"
import Banner from "@/components/Banner1";
import Banner2 from "@/components/Banner2";
import Banner3 from "@/components/Banner3";
import EditBanner from "@/components/EditBanner";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<number | null>(null);
  const [loading,setLoading] = useState(false)

  const [bannersData,setBannersData] = useState([
    {
      "title": "Savor the Flavor!",
      "description": "Discover our rich selection of premium coffees",
      "cta": "Shop Now",
      "image": "https://images.unsplash.com/photo-1675306408031-a9aad9f23308?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png",
      "backgroundIndex": 1
    },
    {
      "title": "Title2!",
      "description": "Description2",
      "cta": "cta2",
      "image": "https://images.unsplash.com/photo-1675306408031-a9aad9f23308?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png",
      "backgroundIndex": 1
    },
    {
      "title": "Title2",
      "description": "Description2",
      "cta": "cta2",
      "image": "https://images.unsplash.com/photo-1675306408031-a9aad9f23308?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/15/square.png",
      "backgroundIndex":2
    },
    {
      "title": "Title2",
      "description": "Description2",
      "cta": "cta2",
      "image": "https://images.unsplash.com/photo-1675306408031-a9aad9f23308?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/9/square.png",
      "backgroundIndex":3
    }
  ]);

  const handleUpdateBanner = (updatedBanner: typeof bannersData[0]) => {
    if(selectedBanner !== null){
      const updatedBanners = [...bannersData]
      updatedBanners[selectedBanner] = updatedBanner;
      setBannersData(updatedBanners)
      localStorage.setItem('banners', JSON.stringify(updatedBanners))
    }
    setIsEditing(false);
    setSelectedBanner(null);
  }

  const handleEditClick = (index: number) => {
    // Implement edit functionality
    setSelectedBanner(index);
    setIsEditing(true)
    console.log(setIsEditing)
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setSelectedBanner(null);
  }

  useEffect(() => {
    const savedBanners = localStorage.getItem("banners");
    if(savedBanners){
      setBannersData(JSON.parse(savedBanners));
    }
    setLoading(true)
  },[])

  if(!loading){
    return <div>
      Loading...
    </div>
  }
  const renderBanner = (banner: typeof bannersData[0], index: number) => {
    switch (banner.backgroundIndex) {
      case 1:
        return (
          <Banner
            key={index}
            title={banner.title}
            description={banner.description}
            cta={banner.cta}
            image={banner.image}
            background={banner.background}
            backgroundIndex={banner.backgroundIndex}
            editButton={''}
            onEdit={() => handleEditClick(index)}
          />
        );
      case 2:
        return (
          <Banner2
            key={index}
            title={banner.title}
            description={banner.description}
            cta={banner.cta}
            image={banner.image}
            background={banner.background}
            backgroundIndex={banner.backgroundIndex}
            editButton={''}
            onEdit={() => handleEditClick(index)}
          />
        );
      case 3:
        return (
          <Banner3
            key={index}
            title={banner.title}
            description={banner.description}
            cta={banner.cta}
            image={banner.image}
            background={banner.background}
            backgroundIndex={banner.backgroundIndex}
            editButton={''}
            onEdit={() => handleEditClick(index)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Banners Page</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {bannersData.map((banner, index) => (
          renderBanner(banner,index)
        ))}
      </div>
      {isEditing && selectedBanner !== null && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <EditBanner banner={bannersData[selectedBanner]} onClose={handleCloseEdit} 
            onUpdate={handleUpdateBanner}
            selectedBanner={selectedBanner}
            />
          </div>
        </div>
      )}
      <div>
      </div>
    </div>
  );
}

export default Home;
