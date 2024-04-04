import React, { useState } from 'react'

interface Props {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<Props> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));

    const handleChange = (element: EventTarget & HTMLInputElement, index: number) => {
      const value = element.value;
      // Check if entered value is a number
      if (/^[0-9]$/.test(value)) {
        setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
        // Move to next input
        const nextInput = element.nextSibling as HTMLInputElement | null;
        if (nextInput) {
          nextInput.focus();
        } else {
          // Submit OTP
          onComplete && onComplete(`${otp.join('')}${value}`);
        }
      } else if (value === '') {
        // Allow deletion
        setOtp([...otp.slice(0, index), '', ...otp.slice(index + 1)]);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, length).split('');
        if (pasteData.length === length && pasteData.every(char => /^[0-9]$/.test(char))) {
            setOtp(pasteData);
            onComplete && onComplete(pasteData.join(''));
        }
    };

    return (
        <div onPaste={handlePaste} className="flex self-center space-x-2">
            {otp.map((data, index) => (
                <input
                    className="w-12 h-12 text-lg text-center transition-all border rounded outline-none focus:ring-primary focus:ring-2"
                    key={index}
                    type="text"
                    name={`otp-${index}`}
                    maxLength={1}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                />
            ))}
        </div>
    );
}

export default OTPInput
