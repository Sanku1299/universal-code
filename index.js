document.getElementById("trackBtn").addEventListener("click", trackShipment);

document.querySelector(".secondary-btn").addEventListener("click", function () {
    document.getElementById("TrackingSection").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("trackBtn").addEventListener("click", function () {

  const resultSection = document.getElementById("result");

  resultSection.scrollIntoView({
    behavior: "smooth"
  });

});

async function trackShipment() {

    const awb = document.getElementById("awbInput").value;

    if (!awb) {
        alert("Please enter AWB number");
        return;
    }

    try {

        const response = await fetch(`https://universal-backend-babm.onrender.com/track/${awb}`);

        const data = await response.json();

        // console.log(data);

        if (data.message) {
            alert(data.message);
            return;
        }

        displayShipment(data);

    } catch (err) {
        console.error(err);
        alert("Server error");
    }

}

function displayShipment(data) {

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = `
    <h3>AWB Search Result</h3>
    <table>
        <tbody>
            <tr>
                <th>Waybill No</th>
                <td>${data.awb}</td>
            </tr>
            <tr>
                <th>Pickup Date</th>
                <td>${data.pickup_date}</td>
            </tr>
            <tr>
                <th>From</th>
                <td>${data.from}</td>
            </tr>
            <tr>
                <th>To</th>
                <td>${data.to}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>${data.status}</td>
            </tr>
            <tr>
                <th>Date of Delivery</th>
                <td>${data.delivery_date}</td>
            </tr>
            <tr>
                <th>Time of Delivery</th>
                <td>${data.delivery_time}</td>
            </tr>
            <tr>
                <th>Recipient</th>
                <td>${data.recipient}</td>
            </tr>
            <tr>
                <th>Reference No</th>
                <td>${data.reference_no}</td>
            </tr>
        </tbody>
    </table>
  `;
}