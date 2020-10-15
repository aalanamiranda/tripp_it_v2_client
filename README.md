Tripp It v2 is a TypeScript-React planning application client with operational endpoints to 14 different endpoints to a corresponding  Database.

Tech Stack:
TypeScript/React Client with Material-UI styling

The overall client component structure is as follows:
                                             NewActivity
                                            /
      Auth(w/o Token)       ActivityManager
    /                     /                 \
App                      /                    FetchActivities ----- ActivityCard      NewTrip
    \                   /                                                           /
      Homepage(w/ Token)------------------------------------------------- TripManager
                        \                                                           \
                         \                  NewRental                                 FetchTrips
                          \              /
                            RentalManager
                                         \
                                            FetchRental ----RentalCard

Each Manager has self-contained state Lists (e.g. ActivityManager has activityList) that are passed to it's children
as well as methods that handle CRUD operations to that list after corresponding requests to the backend are made.
These lists then allow for easy client-side handling of list entries.

Due to time constraints, no relations can currently be made from the client, althought relations between data types beyond userId associations is available in the server.