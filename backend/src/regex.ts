
// emailregex.com
export function emailRegex(email: string): boolean {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email) && email.length <= 30;
}

export function passwordRegex(password: string): boolean {
	const re = /^[A-Za-z0-9]{6,20}$/; // only alphanumeric passwords
	return re.test(password);
}

export function cpfRegex(cpf: string): boolean {
	const re = /^\d{3}.?\s?\d{3}.?\s?\d{3}-?\s?\d{2}$/;
	return re.test(cpf);
}

export function addressRegex(address: string): boolean {
	const re = /^[A-Za-z0-9\.\,\s\°\º]{1,40}$/;
	return re.test(address);
}

export function phoneNumberRegex(phoneNumber: string): boolean {
	const re = /^\+?\(?[0-9]{1,4}\)?[-\s\./0-9]{1,15}$/;
	return re.test(phoneNumber);
}
