

const History = ({ history, onHistoryClick}) => {
    return (
        <div>
            <h2>History</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index} onClick={() => onHistoryClick(item)}>
                        {item.method} - {item.url}
                    </li>
                ))}
            </ul>
        </div>
    );
};