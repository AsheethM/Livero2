README

Faire 2 fichiers :
- get_deliverer_history.php : Récupérer les 5 dernières transactions terminées du deliverer à partir de son id.
  Le json retournée doit ressembler à : { success : boolean, message : string, isTransaction : boolean, results : json Object }
 
 
- get_shop_history.php : Récupérer les 5 dernières transactions terminées du shop à partir de son id.
  Le json retournée doit ressembler à 
	{ success : boolean, message : string, isTransaction : boolean, results : json Object }

	
Infos: 
	- Si le status est égal à 6 alors la transaction est terminée.
	- Si le shop ou le deliverer n'a pas de transaction terminée, assigner false à l'attribut isTransactions.
	- Voir exemple sur le fichier : get_informations_about_transaction_with_id dans SRC/Backend/Transaction/Shop