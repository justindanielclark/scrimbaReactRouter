import bcrypt from "bcrypt";
const saltRounds = 10;
const passwords = [
  "supersecurEpassword123!",
  "@uncrackablePassword5!",
  "unBelieve@bles3curity333",
  "f0r3v3rs3Cur3@@@",
];

const encryptedPasswords = await Promise.all(
  passwords.map((pw) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hash(pw, salt);
  })
);

const areEqual = await Promise.all(
  passwords.map((pw, i) => {
    return bcrypt.compare(pw, encryptedPasswords[i]);
  })
);

console.log(areEqual);

// const result = await bcrypt.compare(password, epw);
// const result2 = await bcrypt.compare(notMyPassword, epw);
// console.log({ result, result2 });
