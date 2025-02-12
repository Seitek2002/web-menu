type PlacesProps = {
    renameTitlePlaces: () => void; 
};

const Promo: React.FC<PlacesProps> = ({renameTitlePlaces}) => {
    return (
        <>
            <div className="busket-promo bg-[#fff]">
                <input type="text" placeholder="Введите промокод" className="placeholder:text-[#80868B]" />
                <button className="bg-[#875AFF] text-white" onClick={renameTitlePlaces}>Применить</button>
            </div>
        </>
    );
};

export default Promo;
