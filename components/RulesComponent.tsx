import React from 'react';

const RulesComponent = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">1. Organisation du jeu :</span> 
        <p>
          Le jeu de pronostic sportif en ligne gratuit est organisé par [Nom de l’organisateur],
          ci-après dénommé « l’Organisateur ». Le jeu est ouvert à toute personne physique majeure résidant dans [Pays de résidence], à l’exception des membres et employés de l’Organisateur, ainsi que de leurs familles.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">2. Participation :</span> 
        <p>
          La participation au jeu est gratuite et sans obligation d’achat. Pour participer, les participants doivent se rendre sur le site web [URL du site], s’inscrire en fournissant les informations requises, et effectuer leurs pronostics sur les événements sportifs désignés.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">3. Modalités de participation :</span> 
        <p>
          Chaque participant peut soumettre un seul pronostic par événement sportif. Les pronostics doivent être soumis avant la date limite indiquée sur le site web. Tout pronostic soumis après cette date limite ne sera pas pris en compte.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">4. Sélection des gagnants :</span> 
        <p>
          Les gagnants seront déterminés en fonction du nombre de pronostics corrects. En cas d’égalité, un tirage au sort sera effectué pour désigner les gagnants parmi les participants ayant le même nombre de pronostics corrects. Les gagnants seront informés par courrier électronique ou tout autre moyen de communication fourni lors de l’inscription.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">5. Lots :</span> 
        <p>
          Les lots attribués aux gagnants seront clairement indiqués sur le site web du jeu. Les lots ne sont pas échangeables contre de l’argent ou d’autres biens. L’Organisateur se réserve le droit de remplacer les lots par des lots de valeur équivalente en cas de circonstances imprévues.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">6. Responsabilités de l’Organisateur :</span> 
        <p>
          L’Organisateur ne saurait être tenu responsable des problèmes techniques ou des interruptions qui pourraient affecter la participation au jeu. L’Organisateur se réserve le droit d’annuler, de modifier ou de suspendre le jeu en cas de force majeure.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">7. Protection des données personnelles :</span> 
        <p>
          Les données personnelles fournies par les participants seront traitées conformément à la politique de confidentialité disponible sur le site web du jeu.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">8. Acceptation du règlement :</span> 
        <p>
          La participation au jeu implique l’acceptation sans réserve du présent règlement. Tout participant ne respectant pas le règlement pourra être exclu du jeu.
        </p>
      </div>
      <div className=" flex flex-col justify-start mb-3">
        <span className="font-bold mr-2">9. Litiges :</span> 
        <p>
          En cas de litige, seuls les tribunaux compétents dans [Lieu de compétence] seront compétents.
        </p>
      </div>
    </div>
  );
};

export default RulesComponent;
