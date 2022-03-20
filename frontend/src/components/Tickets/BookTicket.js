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
			<div className="ticket-outer-container">
				<div className="ticket-inner-container">
					<div className="ticket-container">
						<div>
							<img
								className="ticket-poster"
								src="https://picsum.photos/400/600"
								alt="movie-poster"></img>
						</div>
						<div>
							<div className="ticket-title">
								<h2>Book a Ticket</h2>
							</div>
							<div className="ticket-details">
								<h3 className="ticket-movie-title">Movie Title</h3>
								<div className="ticket-info">
									<p>Selected screening: Today, 10:00 | SALA 9</p>
									<p>Selected seat: 16 | 17</p>
									<p>Your data: name | email@email.com</p>
									<p>Total amount: 20 PLN</p>
								</div>
								<div className="ticket-quantity-container">
									<Button
										onClick={handleMinus}
										type="submit"
										label="-"
										className="ticket-quantity-btn"
									/>
									<span className="ticket-quantity">{count}</span>
									<Button
										onClick={handlePlus}
										type="submit"
										label="+"
										className="ticket-quantity-btn"
									/>
								</div>
								<div className="ticket-btn-submit-container">
									<Button type="submit" label="Book" className="ticket-btn-submit" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BookTicket;
