README

Faire 2 fichiers :
- get_deliverer_history.php : R�cup�rer les 5 derni�res transactions termin�es du deliverer � partir de son id.
  Le json retourn�e doit ressembler � : { success : boolean, message : string, isTransaction : boolean, results : json Object }
 
 
- get_shop_history.php : R�cup�rer les 5 derni�res transactions termin�es du shop � partir de son id.
  Le json retourn�e doit ressembler � 
	{ success : boolean, message : string, isTransaction : boolean, results : json Object }

	
Infos: 
	- Si le status est �gal � 6 alors la transaction est termin�e.
	- Si le shop ou le deliverer n'a pas de transaction termin�e, assigner false � l'attribut isTransactions.
	- Voir exemple sur le fichier : get_informations_about_transaction_with_id dans SRC/Backend/Transaction/Shop