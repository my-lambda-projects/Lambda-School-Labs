const express = require("express");
const router = require("express").Router();
const Game = require('./gameModel.js'); 
const Round = require('../rounds/roundModel');
const User = require('../users/userModel.js'); 

router
    .get('/get', (req, res) => {
           
        Game
            .find({})
            .then(games => {
                res.status(200).json(games);
            })
            .catch(err => {
                res.status(500).json(err);
            });
        })

    router
        .post('/create-game', (req, res) => {
            const settings = req.body;
            console.log(settings)
            const game = new Game(settings);
           
            game
                .save()
                .then(inserted => {
                    res.status(201).json(inserted);
                })
                .catch(err => res.status(500).json(err));
        })

    router
        .put('/update-game', (req, res) => {
            const { gameId } = req.body;
            let { files, date, name } = req.body.game;
            let logo = files
            console.log("logo", logo)
            
           
            Game.findByIdAndUpdate(gameId, {logo, name, date})
            .then(updated => {
                    console.log("UPDATED",updated)
                    res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json("Error updating the Game", err)
            })
        })
    
    router  
        .delete('/delete-game/:id',(req, res) => {
            const { id }  = req.params
            

            Game.findByIdAndRemove(id)
            .then(removed => {
                console.log("removed", removed)
                res.status(200).json(removed)
                
            })
            .catch(err => {
                res.status(500).json(console.error("Error deleting round", error))
            })
        })

module.exports = router