import './card.css';
export default function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <img src={props.img} class="img" />
                <h2 className="title">{props.title}</h2>
                <p className="card-description">{props.description}</p>
            </div>
            <button className="card-btn">View Recipe</button>
        </div>
    );
}
