import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./App.module.css";

const App = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    cardName: string;
    cardMonth: string;
    cardYear: string;
    cardCvc: string;
  }>({
    defaultValues: {
      cardName: "",
      cardMonth: "",
      cardYear: "",
      cardCvc: "",
    },
  });

  const splittedInput = cardNumber.match(/.{1,4}/g) || [];
  const inputValueWithSpaces = splittedInput.join(" ");

  const handleNumbers = (e: any) => {
    const input = e.target.value;
    setCardNumber(input.split(" ").join(""));
  };
  let onSubmit = () => {
    if (
      watchCardName === "" ||
      watchCardMonth === "" ||
      watchCardYear === "" ||
      watchCardCvc === "" ||
      inputValueWithSpaces === ""
    ) {
      return;
    } else {
      setIsVisible(!isVisible);
      reset();
      setCardNumber("");
    }
  };

  const handleContinue = () => {
    setIsVisible(!isVisible);
  };

  const watchCardName = watch("cardName");
  const watchCardMonth = watch("cardMonth");
  const watchCardYear = watch("cardYear");
  const watchCardCvc = watch("cardCvc");

  return (
    <div className={styles.App}>
      {/* Card visible details */}
      <div className={styles.cardSection}>
        <div className={styles.frontSide}>
          <div className={styles.circles}></div>
          <div className={styles.circlesSmall}></div>
          <div className={styles.watchCardName}>
            {watchCardName.length === 0 ? (
              "Jane Appleseed"
            ) : (
              <>{watchCardName}</>
            )}
          </div>
          <div className={styles.watchCardNumber}>
            {inputValueWithSpaces.length === 0 ? (
              <div className={styles.watchNumber}>0000 0000 0000 0000</div>
            ) : (
              <>{inputValueWithSpaces}</>
            )}
          </div>
          <div className={styles.watchCardMonth}>
            {watchCardMonth.length === 0 ? (
              <div>00</div>
            ) : (
              <>{watchCardMonth}</>
            )}
          </div>
          <div className={styles.slash}>/</div>
          <div className={styles.watchCardYear}>
            {watchCardMonth.length === 0 ? <div>00</div> : <>{watchCardYear}</>}
          </div>
        </div>
        <div className={styles.backSide}>
          <div className={styles.watchCardCvc}>
            {watchCardMonth.length === 0 ? <div>000</div> : <>{watchCardCvc}</>}
          </div>
        </div>
      </div>
      {/* card input section  */}
      {isVisible ? (
        <div className={styles.thankU}>
          <div className={styles.completed}></div>
          <p className={styles.mainThnx}>Thank you! </p>
          <p className={styles.bodyThnx}>We added your card details</p>
          <button onClick={handleContinue} className={styles.button}>
            Continue
          </button>
        </div>
      ) : (
        <div className={styles.mainSection}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.name}>
              <span>CardHolder Name</span>
              <input
                {...register("cardName", {
                  required: "Can't be blank",
                  pattern: {
                    value: /[^0-9,(" ")]/gi,
                    message: "Wrong format, letters only",
                  },
                  minLength: {
                    value: 2,
                    message: "Must be at least 2 letters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Can't be more than 20 letters",
                  },
                })}
                placeholder="e.g Jane Appleseed"
                className={styles.cardName}
              />
              <div className={styles.errorMsg}>{errors.cardName?.message}</div>
            </div>
            <div className={styles.number}>
              <span>Card Number</span>
              <input
                value={inputValueWithSpaces}
                onChange={handleNumbers}
                maxLength={19}
                placeholder="e.g 1234 5678 9123 0000"
                className={styles.cardNumber}
              />
              {inputValueWithSpaces &&
              inputValueWithSpaces.match(/^[a-zA-Z]*$/) ? (
                <div className={styles.errorMsg}>
                  Wrong format, numbers only
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.valid}>
              <span>Exp.date (MM/YY) CVC</span>
              <div className={styles.inputs}>
                <input
                  {...register("cardMonth", {
                    required: "Can't be blank",
                    pattern: {
                      value: /[^a-zA-Z,(" ")]/gi,
                      message: "Wrong format, numbers only",
                    },
                    minLength: { value: 2, message: "Must be 2 digits" },
                    maxLength: { value: 2, message: "Must be 2 digits" },
                  })}
                  placeholder="MM"
                  className={styles.month}
                />

                <input
                  {...register("cardYear", {
                    required: "Can't be blank",
                    pattern: {
                      value: /[^a-zA-Z,(" ")]/gi,
                      message: "Wrong format, numbers only",
                    },
                    minLength: { value: 2, message: "Must be 2 digits" },
                    maxLength: { value: 2, message: "Must be 2 digits" },
                  })}
                  placeholder="YY"
                  className={styles.year}
                />

                <input
                  {...register("cardCvc", {
                    required: "Can't be blank",
                    pattern: {
                      value: /[^a-zA-Z,(" ")]/gi,
                      message: "Wrong format, numbers only",
                    },
                    minLength: { value: 3, message: "Must be 3 digits" },
                    maxLength: { value: 3, message: "Must be 3 digits" },
                  })}
                  placeholder="e.g 123"
                  className={styles.cvc}
                />
              </div>
              <div className={styles.errorMsg}>
                <div>{errors.cardMonth?.message}</div>
                <div> {errors?.cardCvc?.message}</div>
              </div>
            </div>
            <input
              type="submit"
              value="Confirm"
              onClick={onSubmit}
              className={styles.button}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
