const Loader = () => {
  return (
    <>
      <section className="loader">
        <div>
          <div>
            <span className="one h6"></span>
            <span className="two h3"></span>
          </div>
        </div>

        <div>
          <div>
            <span className="one h1"></span>
          </div>
        </div>

        <div>
          <div>
            <span className="two h2"></span>
          </div>
        </div>

        <div>
          <div>
            <span className="one h4"></span>
          </div>
        </div>
      </section>

      <style>{`
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;  
          height:300px;
        }

        .loader div {
        scale:1.3;
          position: absolute;
          width: 50px;
          height: 31px;
        }

        .rot {
          transform: rotate(150deg);
        }

        .rot2 {
          transform: rotate(20deg);
        }

        .loader div:nth-of-type(2) {
          transform: rotate(60deg);
        }

        .loader div:nth-of-type(3) {
          transform: rotate(-60deg);
        }

        .loader div div {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .loader div div span {
          position: absolute;
          width: 4px;
          height: 0%;
          background: #053146;
          z-index: 999999;
        }

        .h1 {
          left: 0;
          animation: load1 3.2s ease infinite;
        }

        .h2 {
          right: 0;
          animation: load2 3.2s ease 0.4s infinite;
        }

        .h3 {
          right: 0;
          animation: load3 3.2s ease 0.8s infinite;
        }

        .h4 {
          top: 10px;
          left: 23px;
          animation: load4 3.2s ease 1s infinite;
          transform: rotate(90deg);
        }

        .h5 {
          bottom: 0;
          animation: load5 3.2s ease 1.2s infinite;
        }

        .h6 {
          left: 0;
          animation: load6 3.2s ease 1.3s infinite;
        }

        @keyframes load1 {
          0% { bottom: 0; height: 0; }
          6.944% { bottom: 0; height: 100%; }
          50% { top: 0; height: 100%; }
          59.944% { top: 0; height: 0; }
        }

        @keyframes load2 {
          0% { top: 0; height: 0; }
          6.944% { top: 0; height: 100%; }
          50% { bottom: 0; height: 100%; }
          59.944% { bottom: 0; height: 0; }
        }

        @keyframes load3 {
          0% { top: 0; height: 0; }
          6.944% { top: 0; height: 100%; }
          50% { bottom: 0; height: 100%; }
          59.944% { bottom: 0; height: 0; }
        }

        @keyframes load4 {
          0% { top: 37px; left: 23px; height: 134%; }
          6.944% { top: 10px; height: 134%; }
          50% { bottom: 10px; height: 134%; }
          59.944% { bottom: 0; height: 0; }
        }

        @keyframes load5 {
          0% { bottom: 0; height: 0; }
          6.944% { bottom: 0; height: 100%; }
          50% { top: 0; height: 100%; }
          59.944% { top: 0; height: 0; }
        }

        @keyframes load6 {
          0% { bottom: 0; height: 0; }
          6.944% { bottom: 0; height: 100%; }
          50% { top: 0; height: 100%; }
          59.944% { top: 0; height: 0; }
        }
      `}</style>
    </>
  );
};

export default Loader;
