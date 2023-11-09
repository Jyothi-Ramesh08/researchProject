//Demonstrate how to create a line chart

async function getData(){
    const response = await fetch('planariadata.csv');    //Double preiod move up 1 folder
    const data = await response.text();
    //console.log(data);

    const xAmounts = []; //x-axis labels = amount of bacteria values
    const yHead = []; //y-axis head fragment regeneration times
    const yTail = []; //y-axis tail fragments regeneration times
    const yTotal = []; //y-axis total fragment regneration times

    // \n - new line characters
    //split ('\n') will seperate table into an array of indiv rows
    //slice (start, end) - return a  new array starting at index start and ending up to but not including index end

    const table = data.split('\n').slice(1);
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(','); //Split each row on the commas
        const xamount = columns[0];    //Assign the year value
        xAmounts.push(xamount);      //Push year values into xAmounts array
        
        const yhead = parseFloat(columns[1]);    //Assign temp values
        yHead.push(yhead);     //Push temp values + 14 to store mean temp values

        const ytail = parseFloat(columns[2]);      //Northern hemisphere temp deviation values
        yTail.push(ytail);

        const ytotal = parseFloat(columns[3]);      //Southern hemisphere temp deviation values
        yTotal.push(ytotal);

        //console.log(year, temp, nhTemp, shTemp);
    });
    return{xAmounts, yHead, yTail, yTotal}
}

async function createChart(){
    const data = await getData();
    console.log(data.yHead)

    const ctx = document.getElementById("myChart");
    const degSym = String.fromCharCode(176);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xAmounts,    //define x-axis/values
            datasets: [             //define y-axis/values
                {
                    label: `Average Number of Days Head Fragments Took to Regenerate`,
                    data: data.yHead,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Average Number of Days Tail Fragments Took to Regenerate`,
                    data: data.yTail,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: `Average Number of Days Both Fragments Took to Regenerate (Average of Two Fragments)`,
                    data: data.yTotal,
                    fill: false,
                    backgroundColor: 'rgba(0, 153, 51, 0.2)',
                    borderColor: 'rgba(0, 153, 51, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,       //Resize based on screen size
            scales: {               //Display options for x and y axes
                x:{
                    title: {
                        display: true,
                        text: 'Amount of E.coli K-12 Added',   //x-axis title
                        font: {         //font properties
                            size: 20
                        },
                    },
                    
                    ticks: {
                        
                        font: {
                            size: 16
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Days Taken to Regenerate',   //y-axis title
                        font: {                                 //font properties
                            size: 20
                        },
                    },
                    ticks: {
                        //maxTicksLimit: data.yTemps.length/10,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {                  //Display options
                title: {
                    display: true,
                    text: 'Average Number of Days Planaria Took to Regenerate',
                    font: {
                        size: 30
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'center',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();