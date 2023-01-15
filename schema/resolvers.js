const {UserList,MovieList} = require('../FakeData')
const _ = require('lodash')

const resolvers = {
    Query:{
        //user resolvers
        users:()=>{
            return UserList;
        },
        user:(parent, args)=>{
            const id = args.id
            const user = _.find(UserList,{id: Number(id)})
            return user
        },

        //movie resolvers
        movies:()=>{
            return MovieList;
        },
        movie:(parent, args)=>{
            const name = args.name
            const movie = _.find(MovieList,{name})
            return movie
        }
    },
    Mutation:{
        createUser:(parent,args)=>{
            const user = args.input
            const lastId = UserList[UserList.length-1].id
            user.id = lastId + 1
            UserList.push(user)
            return user
        },
        updateUsername:(parent,args)=>{
            const {id, newUsername} = args.input
            let updatedUsername
            UserList.forEach((user)=>{
                if(user.id == id){
                    user.username = newUsername
                    updatedUsername = user
                }
            })
            return updatedUsername
        },
        deleteUser:(parent,args)=>{
            const id = args.id
            _.remove(UserList,(user)=> user.id === Number(id))
            return null
        }
    },
    User:{
        favouriteMovies:()=>{
            return  _.filter(MovieList,(movie)=> movie.yearOfPublication >=2000 && movie.yearOfPublication <= 2010)
        }
    }
}

module.exports = resolvers