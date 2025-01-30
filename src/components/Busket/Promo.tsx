type PlacesProps = {
    renameTitlePlaces: () => void; 
};

const Promo: React.FC<PlacesProps> = ({renameTitlePlaces}) => {
    return (
        <>
            <div className="busket-promo">
                <input type="text" placeholder="Введите промокод" />
                <button onClick={renameTitlePlaces}>Применить</button>
            </div>
        </>
    );
};

export default Promo;
