# Gousto Pairing Session

## Specification

Initial Specification:

At Gousto we send boxes of ingredients to customers to cook at home and create their perfect dinner. Customers are able to choose multiple recipes for a different number of people. This means the number of ingredients in a box can vary, and the volume of those ingredients can vary by even more.

For this exercise you'll be given two JSON files.

    boxes.json This contains an array of different box sizes available for us to send an order in. Each box will have an ID, dimensions and a CO2 footprint value.
    orders.json. This contains an array of orders, each order contains an ID and an array of ingredients. These ingredients will have a volume score.

We'd like you to build an app which takes these two files processes them and determines the smallest possible box that the order will fit into. We call this feature Intelligent Packaging
Expected Output

    Output a list of the order IDs and the boxes you've matched against them.

    Output whether we have taken a lorry off the road:

    The sum of the CO2 footprint for every order in the file with Intelligent Packaging.
    The sum of the CO2 footprint without Intelligent Packaging (assuming every order would be in the largest box).
    Whether we have successfully removed a lorry from the road, if we have saved 1000kg of CO2 then this is true (note, these aren't the real numbers, they're much larger!).


Domain: JSON data, boxes.json, order.json
Range: Object { id : ???, box_id: ???}

Input / Output
[{}], 
