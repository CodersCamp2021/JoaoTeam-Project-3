import { Button } from 'primereact/button';

function BuyTicket() {
	return (
		<>
			<div className="outer-container-but-ticket">
				<div className="inner-container-but-ticket">
					<h2 className="buy-ticket-title">Select payment method</h2>
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
					<div className="buy-ticket-payment-options">
						<div className="buy-ticket-payment-option">
							<div className="buy-ticket-payment-option-payu"></div>
							<div className="buy-ticket-payment-option-blik"></div>
							<div className="buy-ticket-payment-option-visa"></div>
						</div>
					</div>
					<Button type="submit" label="Buy Ticket" className="buy-ticket-sub-btn" />
				</div>
			</div>
		</>
	);
}

export default BuyTicket;
