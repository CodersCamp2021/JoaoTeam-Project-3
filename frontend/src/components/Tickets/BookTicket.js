import { Button } from 'primereact/button';
import { useState } from 'react';

function BookTicket() {
	const [count, setCount] = useState(0);

	function handleMinus() {
		setCount(count - 1);
	}

	function handlePlus() {
		setCount(count + 1);
	}

	return (
		<>
			<div className="outer-container-but-ticket">
				<div className="inner-container-but-ticket">
					<h2 className="buy-ticket-title">Book a Ticket</h2>
					<div className="buy-ticket-movie-info">
						<div>
							<img src="https://picsum.photos/200/300" alt="movie-poster"></img>
						</div>
						<div className="buy-ticket-details">
							<h3>Movie Title</h3>
							<p>Selected screening: Today, 10:00 | SALA 9</p>
							<p>Selected seat: 16 | 17</p>
							<p>Your data: name | email@email.com</p>
							<p>Total amount: 20 PLN</p>
						</div>
					</div>
					<div className="book-ticket-amount">
						<Button
							onClick={handleMinus}
							type="submit"
							label="-"
							className="buy-ticket-sub-btn p-button"
						/>
						<span>{count}</span>
						<Button onClick={handlePlus} type="submit" label="+" className="buy-ticket-sub-btn" />
					</div>
					<Button type="submit" label="Book" className="buy-ticket-sub-btn" />
				</div>
			</div>
		</>
	);
}

export default BookTicket;
