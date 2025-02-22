import "./style.scss"

type PlacesProps = {
    renameTitlePlaces: () => void; 
};

const Promo: React.FC<PlacesProps> = ({renameTitlePlaces}) => {
    return (
        <>
            <div className="busket__promo-code bg-[#fff]">
                <input type="text" placeholder="Введите промокод" className="placeholder:text-[#80868B]" />
                <button className="bg-[#875AFF] text-white" onClick={renameTitlePlaces}>Применить</button>
            </div>
        </>
    );
};

export default Promo;
