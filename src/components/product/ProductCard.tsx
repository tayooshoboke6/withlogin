import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: boolean;
  rating: number;
  reviewCount: number;
  deliveryDays: number;
  category?: string;
}

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;
  transition: box-shadow 0.3s, transform 0.3s;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e53935;
  color: white;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: bold;
  
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 2px 6px;
    top: 5px;
    right: 5px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  @media (max-width: 1024px) {
    height: 150px;
  }
  
  @media (max-width: 768px) {
    height: 120px;
  }
  
  @media (max-width: 480px) {
    height: 100px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CategoryLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 10px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    height: 36px;
    margin: 0 0 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    height: 32px;
    margin: 0 0 5px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #0066b2;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const OldPrice = styled.span`
  font-size: 14px;
  color: #999;
  margin-left: 8px;
  text-decoration: line-through;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
    margin-left: 5px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Stars = styled.div`
  color: #ffa500;
  display: flex;
`;

const ReviewCount = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: 5px;
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const DeliveryInfo = styled.div`
  font-size: 12px;
  color: #009900;
  margin-bottom: 15px;
  
  @media (max-width: 480px) {
    font-size: 10px;
    margin-bottom: 10px;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  gap: 8px;
`;

const AddToCartButton = styled.button`
  background-color: #0066b2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #005091;
  }
  
  svg {
    margin-right: 5px;
  }
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 5px 8px;
    font-size: 11px;
    
    svg {
      margin-right: 3px;
      width: 12px;
      height: 12px;
    }
  }
`;

const OptionsButton = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  position: relative;
  min-width: 36px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 5px;
    margin-left: 0;
    min-width: 28px;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const OptionsMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  width: 160px;
  margin-top: 5px;
`;

const OptionItem = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  oldPrice,
  discount,
  rating,
  reviewCount,
  deliveryDays,
  category
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1
    });
    
    // Navigate to product page after adding to cart
    navigate(`/product/${id}`);
  };
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
          </svg>
        );
      }
    }
    return stars;
  };

  const handleAddToWishlist = () => {
    console.log(`Added product ${id} to wishlist`);
    setOptionsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      setOptionsOpen(false);
    };

    if (optionsOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [optionsOpen]);

  return (
    <Card>
      {discount && <DiscountBadge>SAVE {Math.round(((oldPrice! - price) / oldPrice!) * 100)}%</DiscountBadge>}
      
      <ImageContainer onClick={handleProductClick}>
        <img src={image} alt={name} />
      </ImageContainer>
      
      <ProductInfo>
        {category && <CategoryLabel>{category}</CategoryLabel>}
        <ProductName onClick={handleProductClick}>{name}</ProductName>
        
        <PriceContainer>
          <Price>{formatCurrency(price)}</Price>
          {oldPrice && <OldPrice>{formatCurrency(oldPrice)}</OldPrice>}
        </PriceContainer>
        
        <RatingContainer>
          <Stars>{renderStars()}</Stars>
          <ReviewCount>({reviewCount})</ReviewCount>
        </RatingContainer>
        
        <DeliveryInfo>Delivery in {deliveryDays} day{deliveryDays !== 1 ? 's' : ''}</DeliveryInfo>
        
        <ActionContainer>
          <AddToCartButton onClick={handleAddToCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            Add to Cart
          </AddToCartButton>
          
          <OptionsButton onClick={(e) => {
            e.stopPropagation();
            setOptionsOpen(!optionsOpen);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
            <OptionsMenu isOpen={optionsOpen} onClick={(e) => e.stopPropagation()}>
              <OptionItem onClick={handleAddToWishlist}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                Add to Wishlist
              </OptionItem>
            </OptionsMenu>
          </OptionsButton>
        </ActionContainer>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
