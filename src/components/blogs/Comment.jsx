import React from "react";

function Comment({ comment, author, business }) {
  return (
    <div className="flex flex-col py-16">
      <article className="border-white px-4 md:px-9 py-8 border-4 md:w-[900px]">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/5">
            <svg
              width="78"
              height="70"
              viewBox="0 0 78 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.5988 69.3H0.59883V32.1C0.59883 22.1 2.59883 14.5 6.59883 9.29999C10.9988 3.89999 18.3988 0.799984 28.7988 -1.78814e-05V17.7C25.1988 17.7 22.1988 19.2 19.7988 22.2C18.5988 23.8 17.9988 26.9 17.9988 31.5V37.2H30.5988V69.3ZM77.3988 69.3H47.3988V32.1C47.3988 22.1 49.1988 14.8 52.7988 10.2C57.5988 4.19999 65.1988 0.799984 75.5988 -1.78814e-05V17.7C69.3988 17.7 65.8988 20.8 65.0988 27C64.8988 27.8 64.7988 29.3 64.7988 31.5V37.2H77.3988V69.3Z"
                fill="#005692"
              />
            </svg>
          </div>
          <div className="md:w-4/5">
            <p className="text-xl font-semibold mb-8">{comment}</p>
            <div className="flex justify-start gap-8 items-center mb-8">
              <p className="font-light">{author}</p>-
              <p className="font-light">{business}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Comment;
