# POST /grid
```
Example for the body:
{ 
  "grid" : [
	    [
		        {
                    "x": 0,
                    "y": 0,
                    "on": true,
                    "bri": 70,
                    "color": {
                       "r": 255,
                       "g": 255,
                       "b": 0
                    }
        },        
	    ],
	    [

	    ],
    ],
    "duration": 0
}

Response:
200 - Success
400 - Bad request: No grid available

```
# POST /light
Example for the body:
```
{
    'x': 1,
    'y': 1,
    'r': 255,
    'g': 100, 
    'b': 100, 
    'bri': 255
    'duration': 1000
}	
```
Response:
200 - Success
400 - Bad request