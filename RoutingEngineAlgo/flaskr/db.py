import sqlite3 
import click 
from flask import current_app, g , jsonify
from flask.cli import with_appcontext

#from sqlobject import * 

def get_db() : 
    if "db" not in g : 
        g.db = sqlite3.connect(
            current_app.config["DATABASE"], 
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row 
    
    return g.db


def close_db(e = None ) : 
    db = g.pop('db', None)

    if db is not None : 
        db.close() 

def init_db() : 
    db = get_db()

    with current_app.open_resource("schema.sql") as f : 
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
@with_appcontext 
def init_db_command() : 
    init_db() 
    click.echo("Initialized the database")

@click.command("add-customer_id")
@with_appcontext
def add_customer_id_command(username, customer_id) : 
    db = get_db() ; 
    db.execute(
        'INSERT INTO customers (id) VALUES (?) WHERE username = ?',(customer_id, username)
    )

@click.command("add-agent_id")
@with_appcontext
def add_customer_id_command(username, customer_id) : 
    db = get_db() ; 
    db.execute(
        'INSERT INTO agent (id) VALUES (?) WHERE username = ?',(customer_id, username)
    )

def connectApp2db(app) : 
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)       


