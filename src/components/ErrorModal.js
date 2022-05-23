const ErrorModal = ({ isTooShort, alreadyExists }) => {
  return (
    <>
      {isTooShort && (
        <div className="errorModal">
          <div>
            <p>Word must be 5 characters long</p>
          </div>
        </div>
      )}
      {alreadyExists && (
        <div className="errorModal">
          <div>
            <p>You already tried that word!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
